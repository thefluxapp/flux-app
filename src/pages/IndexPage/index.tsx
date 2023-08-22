import { Link } from "react-router-dom"

export function IndexPage() {
  return (
    <div>
      <div>
        <Link to="/auth">
          Auth
        </Link>
      </div>
      <div>
        INDEX PAGE
      </div>
    </div>
  )
}
