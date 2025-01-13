import { useAuth } from '../context/AuthContext';
import styles from '../style';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className={`${styles.paddingX} ${styles.flexCenter} min-h-screen bg-primary`}>
      <div className="w-full max-w-2xl p-8 bg-black-gradient rounded-xl shadow-lg">
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-20 h-20 rounded-full bg-green-gradient flex items-center justify-center text-white text-3xl font-semibold">
            {user?.email?.[0].toUpperCase() || 'U'}
          </div>
          <div>
            <h1 className="text-3xl font-semibold text-white">Profile</h1>
            <p className="text-dimWhite">{user?.email}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-4 bg-black-gradient-2 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-2">Account Information</h2>
            <div className="space-y-2">
              <p className="text-dimWhite">
                <span className="text-secondary">Email:</span> {user?.email}
              </p>
              <p className="text-dimWhite">
                <span className="text-secondary">Account Created:</span>{' '}
                {user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'N/A'}
              </p>
              <p className="text-dimWhite">
                <span className="text-secondary">Last Sign In:</span>{' '}
                {user?.metadata?.lastSignInTime ? new Date(user.metadata.lastSignInTime).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          </div>

          <div className="p-4 bg-black-gradient-2 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-2">Account Settings</h2>
            <p className="text-dimWhite">More settings coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 