/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  collections: {
    users: User;
    media: Media;
    pages: Page;
    cases: Case;
    services: Service;
    filters: Filter;
    'payload-locked-documents': PayloadLockedDocument;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  collectionsSelect: {
    users: UsersSelect<false> | UsersSelect<true>;
    media: MediaSelect<false> | MediaSelect<true>;
    pages: PagesSelect<false> | PagesSelect<true>;
    cases: CasesSelect<false> | CasesSelect<true>;
    services: ServicesSelect<false> | ServicesSelect<true>;
    filters: FiltersSelect<false> | FiltersSelect<true>;
    'payload-locked-documents': PayloadLockedDocumentsSelect<false> | PayloadLockedDocumentsSelect<true>;
    'payload-preferences': PayloadPreferencesSelect<false> | PayloadPreferencesSelect<true>;
    'payload-migrations': PayloadMigrationsSelect<false> | PayloadMigrationsSelect<true>;
  };
  db: {
    defaultIDType: number;
  };
  globals: {
    home: Home;
    footer: Footer;
  };
  globalsSelect: {
    home: HomeSelect<false> | HomeSelect<true>;
    footer: FooterSelect<false> | FooterSelect<true>;
  };
  locale: null;
  user: User & {
    collection: 'users';
  };
  jobs?: {
    tasks: unknown;
    workflows?: unknown;
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: number;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: number;
  alt: string;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages".
 */
export interface Page {
  id: number;
  title: string;
  layout?: Section[] | null;
  meta?: {
    title?: string | null;
    image?: (number | null) | Media;
    description?: string | null;
  };
  publishedAt?: string | null;
  slug?: string | null;
  slugLock?: boolean | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "Section".
 */
export interface Section {
  title?: string | null;
  anchor?: string | null;
  introduction?: string | null;
  type?: ('section-text' | 'section-clients' | 'section-cases') | null;
  content?: (Clients | CallToAction | Text | Cases)[] | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'section';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "Clients".
 */
export interface Clients {
  list?:
    | {
        logo: number | Media;
        url?: string | null;
        companyName?: string | null;
        id?: string | null;
      }[]
    | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'clients';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "CallToAction".
 */
export interface CallToAction {
  label: string;
  type: 'link' | 'linkExternal' | 'copy';
  action: string;
  variant?: ('default' | 'selected' | 'dark' | 'outline') | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'callToAction';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "Text".
 */
export interface Text {
  text: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  };
  id?: string | null;
  blockName?: string | null;
  blockType: 'text';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "Cases".
 */
export interface Cases {
  id?: string | null;
  blockName?: string | null;
  blockType: 'cases';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "cases".
 */
export interface Case {
  id: number;
  title: string;
  content: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  };
  name: string;
  fullname: string;
  position?: string | null;
  commentary?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "services".
 */
export interface Service {
  id: number;
  title: string;
  content: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  };
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "filters".
 */
export interface Filter {
  id: number;
  order: number;
  level: number;
  key: string;
  multiple: boolean;
  options?:
    | {
        value: string;
        label: string;
        services?: (number | Service)[] | null;
        filters?: (number | Filter)[] | null;
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
  id: number;
  document?:
    | ({
        relationTo: 'users';
        value: number | User;
      } | null)
    | ({
        relationTo: 'media';
        value: number | Media;
      } | null)
    | ({
        relationTo: 'pages';
        value: number | Page;
      } | null)
    | ({
        relationTo: 'cases';
        value: number | Case;
      } | null)
    | ({
        relationTo: 'services';
        value: number | Service;
      } | null)
    | ({
        relationTo: 'filters';
        value: number | Filter;
      } | null);
  globalSlug?: string | null;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: number;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: number;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users_select".
 */
export interface UsersSelect<T extends boolean = true> {
  updatedAt?: T;
  createdAt?: T;
  email?: T;
  resetPasswordToken?: T;
  resetPasswordExpiration?: T;
  salt?: T;
  hash?: T;
  loginAttempts?: T;
  lockUntil?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media_select".
 */
export interface MediaSelect<T extends boolean = true> {
  alt?: T;
  updatedAt?: T;
  createdAt?: T;
  url?: T;
  thumbnailURL?: T;
  filename?: T;
  mimeType?: T;
  filesize?: T;
  width?: T;
  height?: T;
  focalX?: T;
  focalY?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages_select".
 */
export interface PagesSelect<T extends boolean = true> {
  title?: T;
  layout?:
    | T
    | {
        section?:
          | T
          | {
              title?: T;
              anchor?: T;
              introduction?: T;
              type?: T;
              content?:
                | T
                | {
                    clients?:
                      | T
                      | {
                          list?:
                            | T
                            | {
                                logo?: T;
                                url?: T;
                                companyName?: T;
                                id?: T;
                              };
                          id?: T;
                          blockName?: T;
                        };
                    callToAction?:
                      | T
                      | {
                          label?: T;
                          type?: T;
                          action?: T;
                          variant?: T;
                          id?: T;
                          blockName?: T;
                        };
                    text?:
                      | T
                      | {
                          text?: T;
                          id?: T;
                          blockName?: T;
                        };
                    cases?:
                      | T
                      | {
                          id?: T;
                          blockName?: T;
                        };
                  };
              id?: T;
              blockName?: T;
            };
      };
  meta?:
    | T
    | {
        overview?: T;
        title?: T;
        image?: T;
        description?: T;
        preview?: T;
      };
  publishedAt?: T;
  slug?: T;
  slugLock?: T;
  updatedAt?: T;
  createdAt?: T;
  _status?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "cases_select".
 */
export interface CasesSelect<T extends boolean = true> {
  title?: T;
  content?: T;
  name?: T;
  fullname?: T;
  position?: T;
  commentary?: T;
  updatedAt?: T;
  createdAt?: T;
  _status?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "services_select".
 */
export interface ServicesSelect<T extends boolean = true> {
  title?: T;
  content?: T;
  updatedAt?: T;
  createdAt?: T;
  _status?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "filters_select".
 */
export interface FiltersSelect<T extends boolean = true> {
  order?: T;
  level?: T;
  key?: T;
  multiple?: T;
  options?:
    | T
    | {
        value?: T;
        label?: T;
        services?: T;
        filters?: T;
        id?: T;
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents_select".
 */
export interface PayloadLockedDocumentsSelect<T extends boolean = true> {
  document?: T;
  globalSlug?: T;
  user?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences_select".
 */
export interface PayloadPreferencesSelect<T extends boolean = true> {
  user?: T;
  key?: T;
  value?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations_select".
 */
export interface PayloadMigrationsSelect<T extends boolean = true> {
  name?: T;
  batch?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "home".
 */
export interface Home {
  id: number;
  header?: Header[] | null;
  layout?: (Section | ServiceSection)[] | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "Header".
 */
export interface Header {
  title: string;
  introduction?: string | null;
  image?: (number | null) | Media;
  callToAction?: CallToAction[] | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'header';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "ServiceSection".
 */
export interface ServiceSection {
  title?: string | null;
  anchor?: string | null;
  introduction?: string | null;
  type?: 'section-services' | null;
  resultsIntro?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'serviceSection';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "footer".
 */
export interface Footer {
  id: number;
  copyright?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  socials?:
    | {
        label: string;
        link: string;
        id?: string | null;
      }[]
    | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "home_select".
 */
export interface HomeSelect<T extends boolean = true> {
  header?:
    | T
    | {
        header?:
          | T
          | {
              title?: T;
              introduction?: T;
              image?: T;
              callToAction?:
                | T
                | {
                    callToAction?:
                      | T
                      | {
                          label?: T;
                          type?: T;
                          action?: T;
                          variant?: T;
                          id?: T;
                          blockName?: T;
                        };
                  };
              id?: T;
              blockName?: T;
            };
      };
  layout?:
    | T
    | {
        section?:
          | T
          | {
              title?: T;
              anchor?: T;
              introduction?: T;
              type?: T;
              content?:
                | T
                | {
                    clients?:
                      | T
                      | {
                          list?:
                            | T
                            | {
                                logo?: T;
                                url?: T;
                                companyName?: T;
                                id?: T;
                              };
                          id?: T;
                          blockName?: T;
                        };
                    callToAction?:
                      | T
                      | {
                          label?: T;
                          type?: T;
                          action?: T;
                          variant?: T;
                          id?: T;
                          blockName?: T;
                        };
                    text?:
                      | T
                      | {
                          text?: T;
                          id?: T;
                          blockName?: T;
                        };
                    cases?:
                      | T
                      | {
                          id?: T;
                          blockName?: T;
                        };
                  };
              id?: T;
              blockName?: T;
            };
        serviceSection?:
          | T
          | {
              title?: T;
              anchor?: T;
              introduction?: T;
              type?: T;
              resultsIntro?: T;
              id?: T;
              blockName?: T;
            };
      };
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "footer_select".
 */
export interface FooterSelect<T extends boolean = true> {
  copyright?: T;
  socials?:
    | T
    | {
        label?: T;
        link?: T;
        id?: T;
      };
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}