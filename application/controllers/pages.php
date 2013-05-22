<?php 
	class Pages extends CI_Controller{
		
		public function view($page='home'){
			$test=constant('MAIN_FOLDER').'application/views/'.$page.'.php';
			echo "<br/>\n page $page test   $test  exists ".file_exists($test);
			if(!file_exists(constant('MAIN_FOLDER').'application/views/pages/'.$page.'.php')){
				//whoops, we don't have a page for that!
				show_404();
			}
			
			$data['title']=ucfirst($page); //Capitalize the first letter
			echo "<br/>\n header $main_folder ".file_exists($main_folder.'/templates/header');
			$this->load->view('templates/header',$data);
			$this->load->view('pages/'.$page,$data);
			$this->load->view('templates/footer',$data);
		}
	}

?>