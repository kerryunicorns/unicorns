<?php 
	class Pages extends CI_Controller{
		
		public function view($page='home'){
			$thePage=constant('MAIN_FOLDER').'application/views/pages/'.$page.'.php';
			if(!file_exists($thePage)){
				//whoops, we don't have a page for that!
				show_404();
			}
			
			$data['title']=ucfirst($page); //Capitalize the first letter
			$this->load->view('templates/header',$data);
			$this->load->view('pages/'.$page,$data);
			$this->load->view('templates/footer',$data);
		}
	}

?>