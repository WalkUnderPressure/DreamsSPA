import styles from './layout.module.css';
import Link from 'next/link'

const Layout = ({children})=>{
    return(
        <div className={styles.layoutContainer}>
            <h1>Header</h1>

            {children}

            <h1>footer</h1>
            <div className={styles.footerContainer}>
                <Link href="/" as="/"><a>Go to Home</a></Link>
                <br/>
                <Link href="/b" as="/babel"><a>Go to B</a></Link>
                <br/>
                <Link href="/dreans" as="/dreans"><a>Go to Dreans</a></Link>
                <br/>
                <Link href="/tictactoe" as="/tictactoe"><a>Go to Tic Tac Toe</a></Link>
            </div>
        </div>
    )
}

export default Layout;