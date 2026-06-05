import { render } from "@testing-library/react-native"

import { type HourlyPoint } from "../../types"
import HourlyChart, { buildGeometry } from "../hourly-chart"

const mockPoints: HourlyPoint[] = [
  {
    time: "2026-06-05T14:00",
    temperatureC: 20,
    precipitationProbabilityPct: 10,
  },
  {
    time: "2026-06-05T15:00",
    temperatureC: 22,
    precipitationProbabilityPct: 0,
  },
  {
    time: "2026-06-05T16:00",
    temperatureC: 19,
    precipitationProbabilityPct: 80,
  },
]

describe("HourlyChart", () => {
  it("renders the title and the first hour readout by default", () => {
    const { getByText } = render(<HourlyChart points={mockPoints} />)

    expect(getByText("Next 24 hours")).toBeTruthy()
    expect(getByText("20°")).toBeTruthy()
    expect(getByText("14:00 · 10% rain")).toBeTruthy()
  })

  it("shows the time span on the axis", () => {
    const { getByText } = render(<HourlyChart points={mockPoints} />)

    expect(getByText("14:00")).toBeTruthy()
    expect(getByText("16:00")).toBeTruthy()
  })

  it("renders nothing with fewer than two points", () => {
    const { toJSON } = render(<HourlyChart points={mockPoints.slice(0, 1)} />)

    expect(toJSON()).toBeNull()
  })
})

describe("buildGeometry", () => {
  const width = 300
  const minTemp = 19
  const maxTemp = 22

  it("maps points left-to-right across the width", () => {
    const { coords } = buildGeometry(mockPoints, width, minTemp, maxTemp)

    expect(coords).toHaveLength(3)
    expect(coords[0].x).toBeLessThan(coords[1].x)
    expect(coords[1].x).toBeLessThan(coords[2].x)
  })

  it("puts the hottest hour at the top and the coldest at the bottom", () => {
    const { coords } = buildGeometry(mockPoints, width, minTemp, maxTemp)

    // mockPoints[1] is the max (22°), mockPoints[2] is the min (19°).
    const hottestY = coords[1].y
    const coldestY = coords[2].y
    expect(hottestY).toBeLessThan(coldestY) // smaller y === higher on screen
    expect(coords.every((c) => c.y >= hottestY && c.y <= coldestY)).toBe(true)
  })

  it("drops zero-probability precipitation bars", () => {
    const { bars } = buildGeometry(mockPoints, width, minTemp, maxTemp)

    // Only the 10% and 80% hours produce a bar; the 0% hour is filtered out.
    expect(bars).toHaveLength(2)
  })
})
