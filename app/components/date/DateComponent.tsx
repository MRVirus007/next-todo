import styles from './DateComponent.module.css';
export default function DateComponent() {
    let now = new Date();
    const month = now.toLocaleString('en-US', { month: 'short' });
    const day = now.getDate();
    return (
        <>
            <div className="float-left">
                <div className={styles.calendar_row}>
                    <time className={`${styles.date_as_calendar} ${styles.position_em}`}>
                        <span className={styles.day}>{ day}</span>
                        <span className={styles.month}>{ month}</span>
                    </time>
                    <h2 className={`${styles.today} mt-2 ms-4`}>Today</h2>
                </div>
            </div>
        </>
    );
}