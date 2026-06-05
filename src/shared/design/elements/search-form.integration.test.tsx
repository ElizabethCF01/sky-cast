import { render, fireEvent } from "@testing-library/react-native"
import { useState } from "react"
import { View } from "react-native"

import Button from "./button/button"
import SearchInput from "./search-input/search-input"

function SearchForm({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = useState("")
  return (
    <View>
      <SearchInput
        testID="search-input"
        placeholder="Search cities..."
        value={query}
        onChangeText={setQuery}
      />
      <Button label="Search" onPress={() => onSearch(query)} />
    </View>
  )
}

describe("SearchForm integration", () => {
  it("submits the typed query when the Search button is pressed", () => {
    const onSearch = jest.fn()
    const { getByTestId, getByRole } = render(
      <SearchForm onSearch={onSearch} />,
    )

    fireEvent.changeText(getByTestId("search-input"), "London")
    fireEvent.press(getByRole("button"))

    expect(onSearch).toHaveBeenCalledWith("London")
    expect(onSearch).toHaveBeenCalledTimes(1)
  })

  it("submits an empty string when nothing was typed", () => {
    const onSearch = jest.fn()
    const { getByRole } = render(<SearchForm onSearch={onSearch} />)

    fireEvent.press(getByRole("button"))

    expect(onSearch).toHaveBeenCalledWith("")
  })
})
