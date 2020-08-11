import { ViewStyle, ImageStyle, TextStyle } from "react-native"
import { spacing } from "../../theme"

export const cardItemStyles = {
  WRAPPER: {
    flexDirection: 'row',
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[4],
  } as ViewStyle,
  THUMB: {
    width: 48,
    height: 48,
    resizeMode: 'cover',
    borderRadius: 4,
  } as ImageStyle,
  TITLE_WRAPPER: {
    flex: 1,
  } as ViewStyle,
  TITLE: {
    marginHorizontal: spacing[4],
    overflow: "hidden"
  } as TextStyle
}
