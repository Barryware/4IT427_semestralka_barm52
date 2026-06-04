interface Props {
  title: string
  description: string
}

export default function Placeholder({ title, description }: Props) {
  return (
    <div className="placeholder">
      <div className="placeholder-title">{title}</div>
      <div className="placeholder-desc">{description}</div>
    </div>
  )
}
