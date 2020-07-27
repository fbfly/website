import '../styles/user-display.sass'

const UserDisplay = ({ user }) => {
  return (
    <div className="user-display">
      {user.profileImage && (
        <div className="user-display-img-container">
          <img className="user-display-img" src={user.profileImage} />
        </div>
      )}
      <div className="user-display-name">{user.name}</div>
    </div>
  )
}

export default UserDisplay
