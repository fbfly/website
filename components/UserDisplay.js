import styles from './UserDisplay.module.sass'

const UserDisplay = ({ user }) => {
  return (
    <div className={styles.userDisplay}>
      {user.profileImage && (
        <div className={styles.userDisplayImgContainer}>
          <img className={styles.userDisplayImg} src={user.profileImage} />
        </div>
      )}
      <div className={styles.userDisplayName}>{user.name}</div>
    </div>
  )
}

export default UserDisplay
