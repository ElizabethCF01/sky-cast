import { type JSX, useMemo, useState } from "react"
import {
  type LayoutChangeEvent,
  PanResponder,
  StyleSheet,
  View,
} from "react-native"
import { Circle, Line, Path, Polyline, Svg } from "react-native-svg"

import { Typography } from "#design/elements"
import { colors, radii, spacing } from "#design/foundations"

import { type HourlyPoint } from "../types"

const CHART_HEIGHT = 110
const LINE_TOP = 9
const LINE_BOTTOM = 64
const PRECIP_BASE = 95
const PRECIP_MAX_HEIGHT = 26
const PADDING_X = 16

type Point = { x: number; y: number }
type Bar = { x: number; top: number; width: number }

type Geometry = {
  linePoints: string
  areaPath: string
  coords: Point[]
  bars: Bar[]
  stepX: number
}

export default function HourlyChart({
  points,
}: {
  points: HourlyPoint[]
}): JSX.Element | null {
  const [width, setWidth] = useState(0)
  const [selected, setSelected] = useState(0)

  const temps = points.map((p) => p.temperatureC)
  const minTemp = Math.min(...temps)
  const maxTemp = Math.max(...temps)

  const geometry = useMemo<Geometry | null>(() => {
    if (width === 0 || points.length < 2) return null
    return buildGeometry(points, width, minTemp, maxTemp)
  }, [points, width, minTemp, maxTemp])

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => false,
        onMoveShouldSetPanResponder: (_evt, gesture) =>
          Math.abs(gesture.dx) > Math.abs(gesture.dy),
        onPanResponderGrant: (evt) =>
          updateSelection(evt.nativeEvent.locationX),
        onPanResponderMove: (evt) => updateSelection(evt.nativeEvent.locationX),
      }),
    [geometry, points.length],
  )

  function updateSelection(locationX: number): void {
    if (!geometry) return
    const index = Math.round((locationX - PADDING_X) / geometry.stepX)
    setSelected(Math.max(0, Math.min(points.length - 1, index)))
  }

  if (points.length < 2) return null

  const active = points[selected]
  const activeCoord = geometry?.coords[selected]

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Typography variant="bodyStrong">Next 24 hours</Typography>
        <View style={styles.readout}>
          <Typography variant="bodyStrong" color="brand">
            {Math.round(active.temperatureC)}°
          </Typography>
          <Typography variant="caption" color="textMuted">
            {formatHour(active.time)} · {active.precipitationProbabilityPct}%
            rain
          </Typography>
        </View>
      </View>

      <View
        testID="hourly-chart-surface"
        style={styles.chart}
        onLayout={(e: LayoutChangeEvent) =>
          setWidth(e.nativeEvent.layout.width)
        }
        {...panResponder.panHandlers}
      >
        {geometry !== null && (
          <Svg width={width} height={CHART_HEIGHT}>
            {geometry.bars.map((bar, i) => (
              <Line
                key={`bar-${i}`}
                x1={bar.x}
                y1={PRECIP_BASE}
                x2={bar.x}
                y2={bar.top}
                stroke={colors.brand}
                strokeOpacity={0.2}
                strokeWidth={bar.width}
                strokeLinecap="round"
              />
            ))}

            <Path d={geometry.areaPath} fill={colors.brand} fillOpacity={0.1} />
            <Polyline
              points={geometry.linePoints}
              fill="none"
              stroke={colors.brand}
              strokeWidth={2.5}
              strokeLinejoin="round"
              strokeLinecap="round"
            />

            {activeCoord !== undefined && (
              <>
                <Line
                  x1={activeCoord.x}
                  y1={LINE_TOP}
                  x2={activeCoord.x}
                  y2={PRECIP_BASE}
                  stroke={colors.border}
                  strokeWidth={1}
                />
                <Circle
                  cx={activeCoord.x}
                  cy={activeCoord.y}
                  r={5}
                  fill={colors.surface}
                  stroke={colors.brand}
                  strokeWidth={2.5}
                />
              </>
            )}
          </Svg>
        )}
      </View>

      <View style={styles.axis}>
        <Typography variant="caption" color="textMuted">
          {formatHour(points[0].time)}
        </Typography>
        <Typography variant="caption" color="textMuted">
          {formatHour(points[points.length - 1].time)}
        </Typography>
      </View>
    </View>
  )
}

export function buildGeometry(
  points: HourlyPoint[],
  width: number,
  minTemp: number,
  maxTemp: number,
): Geometry {
  const stepX = (width - PADDING_X * 2) / (points.length - 1)
  const range = maxTemp - minTemp || 1

  const coords = points.map((point, i) => ({
    x: PADDING_X + i * stepX,
    y:
      LINE_BOTTOM -
      ((point.temperatureC - minTemp) / range) * (LINE_BOTTOM - LINE_TOP),
  }))

  const linePoints = coords.map((c) => `${c.x},${c.y}`).join(" ")
  const first = coords[0]
  const last = coords[coords.length - 1]
  const areaPath = [
    `M ${first.x},${LINE_BOTTOM}`,
    ...coords.map((c) => `L ${c.x},${c.y}`),
    `L ${last.x},${LINE_BOTTOM} Z`,
  ].join(" ")

  const barWidth = Math.max(stepX * 0.4, 3)
  const bars = points
    .map((point, i) => ({
      x: PADDING_X + i * stepX,
      top:
        PRECIP_BASE -
        (point.precipitationProbabilityPct / 100) * PRECIP_MAX_HEIGHT,
      width: barWidth,
    }))
    .filter((bar) => bar.top < PRECIP_BASE)

  return { linePoints, areaPath, coords, bars, stepX }
}

function formatHour(isoTime: string): string {
  return `${isoTime.slice(11, 13)}:00`
}

const styles = StyleSheet.create({
  card: {
    alignSelf: "stretch",
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    padding: spacing.lg,
    gap: spacing.sm,
    elevation: 3,
    shadowColor: colors.shadow,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  readout: {
    alignItems: "flex-end",
  },
  chart: {
    height: CHART_HEIGHT,
  },
  axis: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
})
