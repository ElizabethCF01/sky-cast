import { render } from "@testing-library/react-native"

import Typography from "./typography"

describe("Typography", () => {
  describe("smoke", () => {
    it("renders without crashing (default variant)", () => {
      expect(render(<Typography>Hello</Typography>).toJSON()).not.toBeNull()
    })

    it("renders without crashing (display variant)", () => {
      expect(
        render(<Typography variant="display">72</Typography>).toJSON(),
      ).not.toBeNull()
    })

    it("renders without crashing (caption variant)", () => {
      expect(
        render(<Typography variant="caption">Small text</Typography>).toJSON(),
      ).not.toBeNull()
    })
  })
})
