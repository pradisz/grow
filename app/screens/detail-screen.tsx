import * as React from "react"
import { observer } from "mobx-react-lite"
import {
  ViewStyle,
  Image,
  ImageStyle,
  Dimensions,
  View,
  TextStyle,
  SafeAreaView,
} from "react-native"
import Share from "react-native-share"
import { Screen, Text, Header, Button, Icon } from "../components"
import { NavigationScreenProp } from "react-navigation"
import { spacing, color } from "../theme"

const RNFS = require("react-native-fs")

export interface DetailScreenProps {
  navigation: NavigationScreenProp<{}>
}

const ROOT: ViewStyle = {
  flex: 1,
  backgroundColor: "#f8f1e3",
}
const HEADER: ViewStyle = {
  borderBottomWidth: 0.2,
  borderBottomColor: color.palette.brand,
}
const HEADER_TITLE: TextStyle = {
  fontWeight: "bold",
}
const USER_INFO: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  marginHorizontal: spacing[2],
  marginVertical: spacing[4],
}
const AVATAR: ImageStyle = {
  width: 32,
  height: 32,
  resizeMode: "cover",
  borderRadius: 48 / 2,
  marginRight: spacing[2],
}
const IMAGE: ImageStyle = {
  width: Dimensions.get("window").width,
  height: 300,
  resizeMode: "cover",
  borderRadius: 4,
}
const LIKES_WRAPPER: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  marginHorizontal: spacing[2],
  marginVertical: spacing[4],
}
const ICON: ImageStyle = {
  width: 24,
  height: 24,
  marginRight: spacing[2],
}
const CAPTION: TextStyle = {
  marginHorizontal: spacing[2],
  marginBottom: spacing[4],
  paddingBottom: spacing[8],
}
const FOOTER: ViewStyle = { backgroundColor: "#20162D" }
const FOOTER_CONTENT: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
}
const BUTTON: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: "#5D2555",
}
const BUTTON_TEXT: TextStyle = {
  fontSize: 13,
  letterSpacing: 2,
}

export const DetailScreen: React.FunctionComponent<DetailScreenProps> = observer(props => {
  const goBack = React.useMemo(() => () => props.navigation.goBack(null), [props.navigation])

  const {
    id,
    caption,
    likes,
    image: { regular },
    user: { name, avatar },
    link,
  } = props.navigation.getParam("photo")

  const tag = props.navigation.getParam("tag")

  const handleShare = async () => {
    const path = `${RNFS.DocumentDirectoryPath}/grow-unsplash-${id}.jpg`

    // download remote image and save it to path
    await RNFS.downloadFile({ fromUrl: regular, toFile: `file://${path}` }).promise

    // converts the locally saved file data to base64
    const pathUrl = await RNFS.readFile(`file://${path}`, "base64")

    const shareOptions = {
      message: `Check out this cool ${tag}! by ${name}, ${caption} ${link}`,
      url: `data:image/jpeg;base64,${pathUrl}`,
      social: Share.Social.WHATSAPP,
      whatsAppNumber: "",
    }

    Share.shareSingle(shareOptions)
  }

  return (
    <View style={ROOT}>
      <Screen preset="scroll">
        <Header
          style={HEADER}
          leftIcon="back"
          onLeftPress={goBack}
          headerText={`#${tag}`}
          titleStyle={HEADER_TITLE}
        />
        <View style={USER_INFO}>
          <Image style={AVATAR} source={{ uri: avatar }} />
          <Text text={name} />
        </View>
        <Image style={IMAGE} source={{ uri: regular }} />
        <View style={LIKES_WRAPPER}>
          <Icon icon="heart" style={ICON} />
          <Text text={likes} />
        </View>
        <Text style={CAPTION} text={caption} />
      </Screen>
      <SafeAreaView style={FOOTER}>
        <View style={FOOTER_CONTENT}>
          <Button
            style={BUTTON}
            textStyle={BUTTON_TEXT}
            text="SHARE TO WHATSAPP"
            onPress={handleShare}
          />
        </View>
      </SafeAreaView>
    </View>
  )
})
