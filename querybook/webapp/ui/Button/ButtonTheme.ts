import { IStyledButtonThemeProps } from './StyledButton';

export const ButtonColors = [
    'destructive',
    'confirm',
    'cancel',
    'accent',
    'light',
    'default',
] as const;
export const ButtonThemes = ['outline', 'text', 'fill', 'discreet_fill'] as const;

export type ButtonColorType = typeof ButtonColors[number];
export type ButtonThemeType = typeof ButtonThemes[number];

interface IButtonColorConfig {
    primary: string; // text and icon
    primaryHover?: string;
    secondary: string; // Background and border
    secondaryHover?: string;
    textColor?: string; // Text color override
    backgroundColor?: string; // Background color override
    backgroundHoverColor?: string; // Background hover color override
}

const buttonThemeToProps: Record<ButtonColorType, IButtonColorConfig> = {
    destructive: {
        primary: 'var(--color-button-bg-destructive)',
        secondary: 'var(--color-button-bg-destructive)',
        secondaryHover: 'var(--color-button-bg-destructive)',
        textColor: 'var(--color-text-destructive)',
        backgroundColor: 'var(--color-button-bg-destructive)',
        backgroundHoverColor: 'var(--color-button-bg-destructive)',
    },
    confirm: {
        primary: 'var(--color-true-dark)',
        secondary: 'var(--color-true-dark)',
        secondaryHover: 'var(--color-true)',
    },
    cancel: {
        primary: 'var(--color-false-dark)',
        secondary: 'var(--color-false-dark)',
        secondaryHover: 'var(--color-false)',
    },
    accent: {
        primary: 'var(--color-accent-text)',
        secondary: 'var(--color-accent-bg)',
    },
    light: {
        primary: 'var(--light-text-color)',
        primaryHover: 'var(--text-color)',
        secondary: 'var(--light-bg-color)',
        secondaryHover: 'var(--hover-bg-color)',
    },
    default: {
        primary: 'var(--text-color)',
        primaryHover: 'var(--dark-text-color)',
        secondary: 'var(--border-color)',
        secondaryHover: 'var(--hover-border-color)',
    },
};

export function computeStyleButtonProps(
    colorType: ButtonColorType,
    theme: ButtonThemeType
) {
    const colorConfig = buttonThemeToProps[colorType];
    const secondaryIsPrimary = colorConfig.secondary === colorConfig.primary;
    const themeProps: IStyledButtonThemeProps = {};

    if (theme === 'fill' || theme === 'discreet_fill') {
        if (!secondaryIsPrimary) {
            themeProps.color = colorConfig.primary;
            themeProps.hoverColor =
                colorConfig.primaryHover || colorConfig.primary;
            themeProps.bgColor = theme === 'discreet_fill' ?
                'transparent': colorConfig.secondary;
            themeProps.hoverBgColor =
                colorConfig.secondaryHover || colorConfig.secondary;
        } else {
            themeProps.color = 'var(--bg-color)';
            themeProps.hoverColor = 'var(--light-bg-color)';
            themeProps.bgColor = theme === 'discreet_fill' ?
                'transparent': colorConfig.primary;
            themeProps.hoverBgColor =
                colorConfig.primaryHover || colorConfig.primary;
        }

        // Overrides, given planning to decrease the amount of styles
        themeProps.bgColor = colorConfig.backgroundColor || 'var(--color-button-bg)';
        themeProps.hoverColor = colorConfig.backgroundHoverColor || 'var(--color-button-hover)';

    } else if (theme === 'outline') {
        themeProps.color = colorConfig.primary;
        themeProps.hoverColor = colorConfig.primaryHover || colorConfig.primary;

        themeProps.bgColor = 'var(--bg-color)';
        themeProps.borderColor = colorConfig.secondary;
        themeProps.hoverBorderColor =
            colorConfig.secondaryHover || colorConfig.secondary;
    } else if (theme === 'text') {
        // themeProps.color = colorConfig.primary;
        // themeProps.hoverColor = colorConfig.primaryHover || colorConfig.primary;
        themeProps.bgColor = 'transparent';
        themeProps.padding = '5px 0px';
        // themeProps.hoverBgColor = 'var(--light-bg-color)';
    }

    themeProps.color = colorConfig.textColor || 'var(--ui-text-color)';
    themeProps.hoverColor = colorConfig.textColor || 'var(--text-color)';



    return themeProps;
}
