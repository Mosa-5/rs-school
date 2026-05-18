import styles from './About.module.css';

function About() {
  return (
    <section className={styles.about}>
      <h1>About</h1>
      <p>
        This application was built by <strong>Levan :)</strong>
      </p>
      <p>
        Learn more about the course:{' '}
        <a
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noreferrer"
        >
          RS School React course
        </a>
      </p>
    </section>
  );
}

export default About;
