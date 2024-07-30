import {
    Bold,
    Text,
} from "@create-figma-plugin/ui";
import { h } from "preact";
import styles from "../ui.module.css";

interface labelProps {
    title: string;
    required?: boolean;
}

function Label(
    props: labelProps
) {
    const { title, required } = props;
    return (
        <Text className={styles.text}>
            <Bold>{title}</Bold>
            {required && <div style={{marginLeft: '2px', color: 'var(--figma-color-icon-danger)'}}>*</div>}
        </Text>
    )
}

export default Label;