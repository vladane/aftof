import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { size?: number }

function Icon({ size = 18, children, ...props }: IconProps): JSX.Element {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  )
}

export const FolderPlusIcon = (props: IconProps): JSX.Element => (
  <Icon {...props}>
    <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <path d="M12 11v5M9.5 13.5h5" />
  </Icon>
)

export const FolderIcon = (props: IconProps): JSX.Element => (
  <Icon {...props}>
    <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  </Icon>
)

export const TargetFolderIcon = (props: IconProps): JSX.Element => (
  <Icon {...props}>
    <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <path d="M9 13.5l2.2 2.2L15.5 11" />
  </Icon>
)

export const TrashIcon = (props: IconProps): JSX.Element => (
  <Icon {...props}>
    <path d="M4 7h16M10 7V5h4v2M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12" />
  </Icon>
)

export const SearchIcon = (props: IconProps): JSX.Element => (
  <Icon {...props}>
    <circle cx="11" cy="11" r="6" />
    <path d="m20 20-3.5-3.5" />
  </Icon>
)

export const CopyIcon = (props: IconProps): JSX.Element => (
  <Icon {...props}>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M15 5H6a2 2 0 0 0-2 2v9" />
  </Icon>
)

export const MoveIcon = (props: IconProps): JSX.Element => (
  <Icon {...props}>
    <path d="M4 12h14M13 7l5 5-5 5" />
  </Icon>
)

export const CheckIcon = (props: IconProps): JSX.Element => (
  <Icon {...props}>
    <path d="m5 12.5 4.5 4.5L19 7" />
  </Icon>
)

export const CloseIcon = (props: IconProps): JSX.Element => (
  <Icon {...props}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Icon>
)

export const ImageIcon = (props: IconProps): JSX.Element => (
  <Icon {...props}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <circle cx="8.5" cy="9.5" r="1.5" />
    <path d="m4 17 5-5 4 4 3-2.5L20 17" />
  </Icon>
)

export const VideoIcon = (props: IconProps): JSX.Element => (
  <Icon {...props}>
    <rect x="3" y="5" width="13" height="14" rx="2" />
    <path d="m16 10 5-3v10l-5-3z" />
  </Icon>
)

export const AudioIcon = (props: IconProps): JSX.Element => (
  <Icon {...props}>
    <path d="M9 18V6l10-2v12" />
    <circle cx="6.5" cy="18" r="2.5" />
    <circle cx="16.5" cy="16" r="2.5" />
  </Icon>
)

export const DocumentIcon = (props: IconProps): JSX.Element => (
  <Icon {...props}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
    <path d="M14 3v5h5M9 13h6M9 17h4" />
  </Icon>
)

export const ArchiveIcon = (props: IconProps): JSX.Element => (
  <Icon {...props}>
    <rect x="3" y="4" width="18" height="5" rx="1.5" />
    <path d="M5 9v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9M10.5 13h3" />
  </Icon>
)

export const FileIcon = (props: IconProps): JSX.Element => (
  <Icon {...props}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
    <path d="M14 3v5h5" />
  </Icon>
)

export const RefreshIcon = (props: IconProps): JSX.Element => (
  <Icon {...props}>
    <path d="M20 11a8 8 0 1 0-.6 4" />
    <path d="M20 5v6h-6" />
  </Icon>
)

export const SunIcon = (props: IconProps): JSX.Element => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 3v2m0 14v2M3 12h2m14 0h2M5.6 5.6l1.4 1.4m10 10 1.4 1.4m0-12.8-1.4 1.4m-10 10L5.6 18.4" />
  </Icon>
)

export const MoonIcon = (props: IconProps): JSX.Element => (
  <Icon {...props}>
    <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z" />
  </Icon>
)

export const ExternalIcon = (props: IconProps): JSX.Element => (
  <Icon {...props}>
    <path d="M14 4h6v6M20 4l-8 8" />
    <path d="M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4" />
  </Icon>
)

export const HeartIcon = (props: IconProps): JSX.Element => (
  <Icon {...props}>
    <path d="M12 20s-7.5-4.4-7.5-9.2A4.3 4.3 0 0 1 12 8.2a4.3 4.3 0 0 1 7.5 2.6C19.5 15.6 12 20 12 20z" />
  </Icon>
)

export const GlobeIcon = (props: IconProps): JSX.Element => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3.5 9h17M3.5 15h17" />
    <path d="M12 3c-2.2 2.4-3.3 5.4-3.3 9s1.1 6.6 3.3 9c2.2-2.4 3.3-5.4 3.3-9S14.2 5.4 12 3z" />
  </Icon>
)

export const AlertIcon = (props: IconProps): JSX.Element => (
  <Icon {...props}>
    <path d="M12 4 2.5 20h19z" />
    <path d="M12 10v4.5M12 17.5h.01" />
  </Icon>
)
