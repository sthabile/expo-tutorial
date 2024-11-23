import { MaterialIcons } from "@expo/vector-icons"
import { Pressable,StyleSheet ,Text} from "react-native";

/**
 * keyof tells us the types of each attribute in the props...
 */
type Props = {
    icon: keyof typeof MaterialIcons.glyphMap;
    label: string;
    onPress:() => void;
};

export default function IconButton({icon,label,onPress}: Props){
    return(
        <Pressable style={styles.iconButton} onPress={onPress}>
            <MaterialIcons name={icon} size={24} color="#fff" />
            <Text style={styles.iconButtonLabel} >{label}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    iconButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconButtonLabel:{
        color: '#fff',
        marginTop: 12,
    }
});