import Sidebar from '../components/Sidebar';
import Main from '../components/Main';
import Script from 'react-load-script';

const Index = () => {

  return (
	  <>
	  	<Main />
	  	<div className="sidebar-non-responsive">
      		<Sidebar />
      	</div>
	  </>
  );
}

export default Index