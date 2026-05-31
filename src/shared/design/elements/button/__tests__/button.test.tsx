import { render, fireEvent } from "@testing-library/react-native"

import Button from "../button"

describe("Button", () => {
  describe("smoke", () => {
    it("renders without crashing (primary)", () => {
      expect(render(<Button label="Submit" />).toJSON()).not.toBeNull()
    })

    it("renders without crashing (secondary)", () => {
      expect(
        render(<Button label="Cancel" variant="secondary" />).toJSON(),
      ).not.toBeNull()
    })
  })

  describe("unit", () => {
    it("calls onPress when pressed", () => {
      const onPress = jest.fn()
      const { getByRole } = render(<Button label="Submit" onPress={onPress} />)

      fireEvent.press(getByRole("button"))

      expect(onPress).toHaveBeenCalledTimes(1)
    })

    it("does not call onPress when disabled", () => {
      const onPress = jest.fn()
      const { getByRole } = render(
        <Button label="Submit" onPress={onPress} disabled />,
      )

      fireEvent.press(getByRole("button"))

      expect(onPress).not.toHaveBeenCalled()
    })

    it("renders the label text", () => {
      const { getByText } = render(<Button label="Click me" />)
      expect(getByText("Click me")).toBeTruthy()
    })
  })
})
