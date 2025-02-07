export * from '@chakra-ui/react';

declare module '@chakra-ui/react' {
  export interface TabsTriggerProps {
    children?: React.ReactNode;
    value?: string;
    _before?: {
      backgroundColor?: string;
    };
  }

  export interface TabsContentProps {
    children?: React.ReactNode;
    value?: string;
  }

  export interface ToasterProps {
    toaster: CreateToasterReturn;
    children: (toast: toast.Options<ReactNode>) => ReactNode;
    _hover?: {
      cursor?: string;
    };
  }
}
