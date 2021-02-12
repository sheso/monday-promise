import { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthContext';

const PrivateRoute = ({ children, ...rest }) => {
	const { currentUser } = useContext(AuthContext);

	return (
		<Route { ...rest }>
			{
				currentUser ? (
					<>
						{ children }
					</>
				) : (
					<>
						<Redirect to='/login' />
					</>
				)
			}
		</Route>
	);
};

export default PrivateRoute;
