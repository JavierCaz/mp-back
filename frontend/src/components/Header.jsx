const Header = ({pages = []}) => {
    return (
        <header>
            <nav style={{display:'grid', gridAutoFlow:'column', gap:'1em', justifyContent:'start', padding:'0.5em'}}>
                {pages}
            </nav>
        </header>
    )
}

export default Header
