import * as React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, FlatList, ActivityIndicator } from "react-native"
import { Screen, Text, CardItem } from "../components"
import { useStores } from "../models/root-store"
import { spacing, color } from "../theme"
import { NavigationScreenProp } from "react-navigation"

export interface HomeScreenProps {
  navigation: NavigationScreenProp<{}>
}

const ROOT: ViewStyle = {
  flex: 1,
}
const BRAND_WRAPPER: ViewStyle = {
  alignItems: "center",
  paddingVertical: spacing[3],
  paddingHorizontal: spacing[4],
  borderBottomWidth: 0.2,
  borderBottomColor: color.palette.brand,
}
const SEPARATOR: ViewStyle = {
  borderBottomWidth: 0.2,
  borderBottomColor: color.palette.orange,
}
const FOOTER: ViewStyle = {
  paddingVertical: spacing[4],
}

export const HomeScreen: React.FunctionComponent<HomeScreenProps> = observer(props => {
  const { photoStore } = useStores()

  const [keyword, setKeyword] = React.useState("cactus")
  const [page, setPage] = React.useState(1)
  const [shouldFetch, setShouldFetch] = React.useState(true)
  const [refresh, setRefresh] = React.useState(false)

  const fetchPhotos = () => photoStore.getPhotos(page, keyword)
  const fetchMore = React.useCallback(() => setShouldFetch(true), [])

  // Reset current photo list in photoStore to initial page 1
  const handleRefresh = () => {
    setRefresh(true)
    photoStore.clearPhotos()
    setKeyword(prevState =>
      prevState === "cactus" ? "houseplants" : prevState === "houseplants" && "cactus",
    )
    fetchMore()
    setRefresh(false)
  }

  React.useEffect(() => {
    // Prevent fetching for other state changes
    if (!shouldFetch) return

    const fetch = async () => {
      await fetchPhotos()

      // Set the should fetch call to false to prevent fetching on page number update
      setShouldFetch(false)

      // Increment page for the next call
      setPage(page + 1)
    }

    fetch()
  }, [keyword, page, shouldFetch])

  const separator = () => {
    return <View style={SEPARATOR} />
  }

  const renderFooter = () => {
    if (!shouldFetch) return null

    return (
      <View style={FOOTER}>
        <ActivityIndicator animating size="large" />
      </View>
    )
  }

  return (
    <Screen style={ROOT}>
      <View style={BRAND_WRAPPER}>
        <Text preset="header" text="Grow." />
      </View>
      <FlatList
        data={photoStore.photos}
        renderItem={({ item }) => (
          <CardItem
            {...item}
            onPress={() => props.navigation.navigate("detail", { photo: item, tag: keyword })}
          />
        )}
        keyExtractor={item => item.id}
        onEndReached={fetchMore}
        onEndReachedThreshold={0.9}
        ItemSeparatorComponent={separator}
        onRefresh={handleRefresh}
        refreshing={refresh}
        ListFooterComponent={renderFooter}
      />
    </Screen>
  )
})
