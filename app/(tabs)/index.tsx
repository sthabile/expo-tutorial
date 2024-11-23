import { View, StyleSheet} from "react-native";
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'
import { ImageSource } from "expo-image";

import ImageViewer from "../components/ImageViewer";
import Button from "../components/Button";
import IconButton from "../components/IconButton";
import CircleButton from "../components/CircleButton";
import EmojiPicker from "../components/EmojiPicker";
import EmojiList from "../components/EmojiList";
import EmojiSticker from "../components/EmojiSticker";

const PlaceholderImage = require('@/assets/images/background-image.png');

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSource | undefined>(undefined)

  const pickImageAsync = async () =>{
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    })

    if(!result.canceled){
      console.log(result);
      setSelectedImage(result.assets[0].uri)
      setShowAppOptions(true)
    }
    else{
      alert("You did not select any image")
    }
  }

  const onReset = ()=>{
    setShowAppOptions(false);
  }

const onAddSticker = () => {
    setShowEmojiPicker(true);
    console.log("Setting show emoji picker to true")
  };

  const onModalClose = () =>{
    setShowEmojiPicker(false);
  }
  const onSaveImageAsync = async () => {
    // we will implement this later
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage}/>
        {
          //if there is a picked emoji, add its sticker on the image.
          //so we can sort of do null checks this way...
          pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji}/>
        }
      </View>  
      { showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow} >
            <IconButton icon="refresh" label="Reset" onPress={onReset}/>
            <CircleButton onPress={onAddSticker}/>
            <IconButton icon="save-alt" label="save" onPress={onSaveImageAsync}/>
          </View>
        </View>
      ):(
        <View style={styles.footerContainer}>
          <Button label="Choose a photo" theme='primary' onPress={pickImageAsync}/>
          <Button label="Use this photo" onPress={() => setShowAppOptions(true)}/>
       </View>
      )}

      <EmojiPicker isVisible={showEmojiPicker} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose}></EmojiList>
      </EmojiPicker>
    </View>
  );
}

const styles = StyleSheet.create({
  container :{
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text:{
    color: '#fff',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff', 
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
  imageContainer: {
    flex: 1,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
})
 