import { File, Files, Folder } from "@/core/components/files";

export const FileTree = () => (
  <Files>
    <Folder name="app" defaultOpen>
      <File name="layout.tsx" />
      <File name="page.tsx" />
      <File name="global.css" />
    </Folder>
    <Folder name="components">
      <File name="button.tsx" />
      <File name="tabs.tsx" />
      <File name="dialog.tsx" />
    </Folder>
    <File name="package.json" />
  </Files>
);
