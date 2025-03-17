import { CategoryProps } from './types.d';
export interface DynamicPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export interface AAWP {
  id?: string;
  title?: string;
  content?: any;
  aawpProducts?: any;
}

export interface CategoryProps {
  name?: string;
}

export interface CategoriesProps {
  items?: CategoryProps[];
}

export interface BrandProps {
  name?: string;
}

export interface BrandsProps {
  items?: BrandProps[];
}

export interface PreviewProps {
  sourceUrl?: string;
}

export interface ProductProps {
  id?: number;
  brand?: string;
  category?: string;
  description?: string;
  isfeatured?: boolean;
  isrelated?: boolean;
  price?: string;
  title?: string;
  warranty?: string[];
  bigImage?: {
    node?: {
      sourceUrl?: string;
    };
  };
  featuredImage?: {
    node?: {
      sourceUrl?: string;
    };
  };
  previewImages?: {
    nodes?: PreviewProps[];
  };
  detailsURL?: string;
}

export interface ProductIdProps {
  ownProducts: {
    products: {
      brand: string;
      category: string;
      description: string;
      price: string;
      title: string;
      isfeatured: boolean;
      isrelated: boolean;
      warranty: string[];
      bigImage: {
        node: {
          sourceUrl: string;
        };
      };
      featuredImage: {
        node: {
          sourceUrl: string;
        };
      };
      previewImages: {
        nodes: { sourceUrl: string }[];
      };
    }[];
  };
}
export interface HeaderProps {
  posts?: {
    nodes?: {
      id?: string;
    };
  };
  menu?: {
    headerSetting?: {
      __typename?: string;
      menuTitle1?: string;
      menuTitle2?: string;
      menuTitle3?: string;
      menuTitle4?: string;
      menuUrl1?: string;
      menuUrl2?: string;
      menuUrl3?: string;
      menuUrl4?: string;
      navTitle1?: string;
      navTitle2?: string;
      navTitle3?: string;
      navTitle4?: string;
      navUrl1?: string;
      navUrl2?: string;
      navUrl3?: string;
      navUrl4?: string;
      logo?: {
        cursor?: string;
        node?: {
          sourceUrl?: string;
        };
      };
    };
  };
}

export interface FooterProps {
  posts?: {
    nodes?: {
      id?: string;
    };
  };
  menu?: {
    footerSettings?: {
      __typename?: string;
      cookiesPolicy?: string;
      copyright?: string;
      email?: string;
      facebook?: string;
      linkedin?: string;
      phone?: string;
      privacyPolicy?: string;
      termsOfService?: string;
      twitter?: string;
      whatsapp?: string;
      logo?: {
        cursor?: string;
        node?: {
          sourceUrl?: string;
        };
      };
    };
  };
}

export interface Children {
  children: React.ReactNode;
}

export interface GraphQLResponse<T = any> {
  data?: T;
  errors?: Array<{ message: string }>;
}

export interface Page {
  databaseId: string;
  date: string;
  modified: string;
  slug: string;
  title?: string;
  content?: string;
  seo: {
    metaDesc?: string;
    title?: string;
  };
  emailSender?: {
    __typename?: string;
    emailTitle?: string;
    subscribe?: string;
    emailPlaceholder?: string;
    emailTypingPlaceholder?: string;
  };
  categoriesAndBrands?: {
    __typename?: string;
    categoriesBrandsTitle?: string;
    brandTitle?: string;
    categoryTitle?: string;
  };
  hero?: {
    __typename?: string;
    featuredImage?: {
      node?: {
        altText?: string;
        sourceUrl?: string;
      };
    };
    heroTitle?: string;
    heroSubtitle?: string;
    content?: string;
    hyperlinks?: [
      {
        link?: string;
        name?: string;
      }
    ];
  };
  featuredProducts?: {
    __typename?: string;
    featuredProductTitle?: string;
  };
  filterProducts?: {
    productsFilter?: string;
  };
  relatedProducts?: {
    related_products_title?: string;
  };
}
