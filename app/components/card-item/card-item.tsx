import * as React from "react"
import { ViewStyle, GestureResponderEvent, Image, View } from "react-native"
import { Text } from "../"
import { cardItemStyles as styles } from "./card-item.styles"
import { TouchableOpacity } from "react-native-gesture-handler"

export interface CardItemProps {
  /**
   * Text which is looked up via i18n.
   */
  tx?: string

  /**
   * Photo model
   */
  caption?: string
  image?: {
    thumb?: string
  }

  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle

  onPress?: (event: GestureResponderEvent) => void
}

/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export function CardItem(props: CardItemProps) {
  // grab the props
  const {
    tx,
    caption,
    image: { thumb },
    onPress,
    ...rest
  } = props

  return (
    <TouchableOpacity style={styles.WRAPPER} onPress={onPress} {...rest}>
      <Image style={styles.THUMB} source={{ uri: thumb }} />
      <View style={styles.TITLE_WRAPPER}>
        <Text style={styles.TITLE} tx={tx} text={caption} />
      </View>
    </TouchableOpacity>
  )
}
