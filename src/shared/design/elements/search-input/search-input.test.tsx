import { render } from "@testing-library/react-native"

import SearchInput from "./search-input"

describe("SearchInput", () => {
  describe("smoke", () => {
    it("renders without crashing", () => {
      expect(render(<SearchInput />).toJSON()).not.toBeNull()
    })

    it("renders with a placeholder", () => {
      expect(
        render(<SearchInput placeholder="Search cities..." />).toJSON(),
      ).not.toBeNull()
    })
  })
})
