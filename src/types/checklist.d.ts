export declare global {
  /** Needed properties for a checklist image. */
  export interface AppChecklistImage {
    /** The url of the image for the title. */
    src: string;
    /** The alt text for the image. */
    alt?: string;
    /** The color of the background in case the url does not work. */
    backgroundColor?: string;
    /** The color of the text on top of the image. */
    textColor?: string;
  }

  /** Needed properties for a checklist item. */
  export interface AppChecklistItem {
    /** The unique identifier for an item. */
    id: string;
    /** The title of the item. */
    title: string;
    /** The description of the item. */
    description: string;
    /** The url for more information about the item (Like a wiki). */
    link?: string;
    /** The url to the map ref. */
    map?: string;
    /** A longer and more detailed explanation of the item. */
    more?: string;
    /** Icon to show in the item. */
    icon?: AppChecklistImage;
    /** If the item is checked. */
    checked?: boolean;
  }

  /** Needed properties for a game checklist. */
  export interface AppChecklistCategory {
    /** The unique identifier for an achievement. */
    id: string;
    /** The title of the achievement. */
    title: string;
    /** The description of the achievement. */
    description?: string;
    /** The url of the image for the achievement. */
    image?: AppChecklistImage;
    /** If the category should be hidden in the main checklist page. */
    hidden?: boolean;
    /** If the category is collapsed. */
    collapsed?: boolean;
    /** The list of items for the achievement. */
    items: AppChecklistItem[];
  }

  /** A tab to show in the checklist page. */
  export interface AppChecklistTab {
    /** The unique identifier for a tab. */
    id: string;
    /** Name of the tab to show in the menu. */
    title: string;
    /** The icon to show in the tab. */
    icon?: AppChecklistImage;
    /** List of the ids of the categories to show in the tab. */
    categories: string[];
  }

  /** A list of achievements for a game to complete. */
  export interface AppChecklist {
    /** The schema of the data. */
    $schema: string;
    /** The unique identifier for a game (No spaces). */
    id: string;
    /** The name of the game to show in the menu. */
    displayName: string;
    /** Header properties to show in the checklist page. */
    pageHeader: {
      /** Image to show in the middle of the checklist at the top. */
      image: AppChecklistImage;
      /** The title to show below the image and at the tab. */
      title: string;
      /** The subtitle to show below the title. */
      subtitle?: string;
    };
    /** Categories to complete for the game. */
    categories: AppChecklistCategory[];
    /** The url to the map image to show in the tab "map". */
    map?: string;
    /** Tabs to show in the checklist page. */
    tabs?: AppChecklistTab[];
    /** The fonts to use in the checklist page. */
    fonts?: {
      /** The font to use for the title. */
      title: string;
      /** The font to use for the subtitle. */
      subtitle?: string;
      /** The font to use for the category title. */
      categoryTitle?: string;
      /** The font to use for the category description. */
      categoryDescription?: string;
      /** The font to use for the item title. */
      itemTitle?: string;
      /** The font to use for the item description. */
      itemDescription?: string;
    };
    /** The image to show in the checklist page as background. */
    backgroundImage?: AppChecklistImage;
    /** The image to show as a thumbnail in the menu and the home page. */
    thumbnailImage?: AppChecklistImage;
  }

  /** Type for the app state. */
  export interface AppChecklistState extends Omit<AppChecklist, '$schema'> {
    /** Count of the items completed (percentage is calculated in the client). */
    itemsCompleted: number;
    /** Count of the items. */
    itemsCount: number;
    /** Property to check if all items are completed. */
    isCompleted: boolean;
    /** Property to check if os only a present or an available checklist. */
    isPreset: boolean;
  }
}
