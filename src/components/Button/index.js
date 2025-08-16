import { Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

export function Button({ variant = 'primary', onPress }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.button,
                variant === 'primary' && styles.buttonPrimary,
                variant === 'secondary' && styles.buttonSecondary
            ]}>
            <Text style={styles.buttonText}>
                Converter

            </Text>
        </TouchableOpacity>
    )
};