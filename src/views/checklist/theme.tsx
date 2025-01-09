/**
 * Theme props.
 */
export type ThemeProps = {
  image: AppChecklistState['backgroundImage'];
  fonts: AppChecklistState['fonts'];
  theme: AppChecklistState['theme'];
};

/**
 * Theme component.
 *
 * Components updates the theme of the app based on the provided props.
 */
export function Theme(props: ThemeProps) {
  const { image, fonts, theme } = props;

  const backgroundVariables =
    image &&
    `
    --selected-image-url: url(${image.src});
    --selected-background: var(--${image.backgroundColor ? image.backgroundColor : 'background-main'});
    --selected-text: var(--${image.textColor ? image.textColor : 'text-primary'});
  `;

  const fontsVariables =
    fonts &&
    `
      ${fonts.title && `--font-title: ${fonts.title};`}
      ${fonts.subtitle && `--font-subtitle: ${fonts.subtitle};`}
      ${fonts.categoryTitle && `--font-category-title: ${fonts.categoryTitle};`}
      ${fonts.categoryDescription && `--font-category-description: ${fonts.categoryDescription};`}
      ${fonts.itemTitle && `--font-item-title: ${fonts.itemTitle};`}
      ${fonts.itemDescription && `--font-item-description: ${fonts.itemDescription};`}
  `;

  const themeVariables =
    theme !== 'device' &&
    `
    --text-primary: var(--text-${theme === 'light' ? 'dark' : 'light'});
    --text-secondary: var(--scale-4);
    --text-disabled: var(--scale-${theme === 'light' ? '3' : '5'});
    --text-inverted: var(--text-${theme === 'light' ? 'light' : 'dark'});
    --background-main: var(--background-main-${theme === 'light' ? 'light' : 'dark'});
    --background-sheet: var(--background-sheet-${theme === 'light' ? 'light' : 'dark'});
  `;

  return (
    <style>{`
      :root {
        ${themeVariables}
        ${backgroundVariables}
        ${fontsVariables}
      }
    `}</style>
  );
}
