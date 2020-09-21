import { createStackNavigator } from "react-navigation-stack"
import { HomeScreen, DetailScreen } from "../screens"

export const PrimaryNavigator = createStackNavigator(
  {
    home: { screen: HomeScreen },
    detail: { screen: DetailScreen },
  },
  {
    headerMode: "none",
  },
)

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 */
export const exitRoutes: string[] = ["home"]
