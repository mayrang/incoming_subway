
import Navigator from '../components/Navigator'
import styles from '../styles/Home.module.css'

const Home = () => {
  return (
    <>
    <Navigator />
    <section>
      <select className={styles.selectLine}>
        <option>1호선</option>
      </select>
    </section>
    </>
  )
}
export default Home
