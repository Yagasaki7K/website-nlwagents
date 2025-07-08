import { Navigate, useParams } from "react-router-dom";

type RoomParams = {
	roomId: string;
};

const room = () => {
	const params = useParams<RoomParams>();

	if (!params.roomId) {
		return <Navigate replace to="/" />;
	}

	return <div>room</div>;
};

export default room;
