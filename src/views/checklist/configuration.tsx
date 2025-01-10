import { Helmet } from 'react-helmet-async';

import { useActiveChecklist } from './active-checklist-state';

/**
 * Configuration component.
 *
 * Components updates the theme of the app based on the provided props. Also updates additional
 * parts of the web like the title and description.
 */
export function Configuration() {
  const checklist = useActiveChecklist();

  const { backgroundImage: image, fonts, theme } = checklist;

  const backgroundVariables =
    image &&
    `
    --selected-image-url: url(${image.src});
    ${image.backgroundColor && `--background-main: var(--${image.backgroundColor});`}
    ${image.textColor && `--text-primary: var(--${image.textColor});`}
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
    <Helmet>
      <title>Save Slot • {checklist.displayName}</title>
      {checklist.pageHeader.subtitle && (
        <meta name="description" content={checklist.pageHeader.subtitle} />
      )}

      <style>{`
        :root {
          ${themeVariables}
          ${backgroundVariables}
          ${fontsVariables}
          }
    `}</style>
    </Helmet>
  );
}
