export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <span>© {new Date().getFullYear()} Sweet Shop</span>
          <span>Made with ♥ by You</span>
        </div>
      </div>
    </footer>
  )
}


