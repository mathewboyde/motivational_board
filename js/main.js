$(document).ready(function(){
	ww = $(window).width();
	wh = $(window).height();
	$("#main_canvas")[0].width = ww;
	$("#main_canvas")[0].height = wh;
	var font_sizes = [
		0.025 * ww,
		0.045 * ww,
		0.065 * ww,
	];
	const arr_english = [
		"adaptable", "adventurous", "affectionate", "amazing", "artistic", 
		"beautiful", "boundless", "brave", 
		"calm", "capable", "caring", "clever", "comfortable", "compassionate", "confident", "considerate", "courageous", "creative", 
		"decisive", "determined", "diligent", "dynamic", 
		"eager", "energetic", "entertaining", "enthusiastic", "exuberant", "expressive", 
		"fabulous", "fantastic", "fearless", "friendly", "funny", 
		"generous", "gentle", 
		"happy", "hard-working", "helpful", "hilarious", "honest", 
		"imaginative", "independent", "intellectual", "intelligent", "intuitive", "inventive", 
		"joyous", 
		"kind", "kind-hearted", "knowledgeable", 
		"level-headed", "lively", "loved", "loving", "loyal", 
		"modest", 
		"optimistic", "outgoing", 
		"passionate", "patient", "persistent", "polite", "practical", "pretty", "pro-active", "productive", 
		"quick-witted", 
		"rational", "receptive", "reliable", "resourceful", "responsible", 
		"sensible", "sensitive", "skillful", "smart", "straightforward", "strong", "successful",
		"thoughtful", "trustworthy",
		"understanding",
		"versatile", "vivacious",
		"warm-hearted", "willing", "wise", "witty", "wonderful",
	];
	const arr_french = [
		"adaptable", "aventurier", "affectueux", "formidable", "artistique",
		"magnifique", "sans limites", "courageux",
		"calme", "capable", "attentionné", "intelligent", "à l'aise", "compatissant", "confiant", "prévenant", "courageux", "créatif",
		"décisif", "déterminé", "diligent", "dynamique",
		"enthousiaste", "énergique", "divertissant", "enthousiasme", "exubérant", "expressif",
		"fabuleux", "fantastique", "intrépide", "amical", "drôle",
		"généreux", "doux",
		"heureux", "travailleur", "serviable", "hilarant", "honnête",
		"imaginatif", "indépendant", "intellectuel", "intelligent", "intuitif", "inventif",
		"joyeux",
		"gentil", "au grand cœur", "instruit",
		"raisonnable", "dynamique", "aimé", "aimant", "loyal",
		"modeste",
		"optimiste", "extraverti",
		"passionné", "patient", "persévérant", "poli", "pratique", "jolie", "proactif", "productif",
		"vif d'esprit",
		"rationnel", "réceptif", "fiable", "débrouillard", "responsable",
		"raisonnable", "sensible", "habile", "intelligent", "franc", "fort", "réussi",
		"prévenant", "digne de confiance",
		"compréhensif",
		"polyvalent", "vivacieux",
		"chaleureux", "volontaire", "sage", "spirituel", "merveilleuse",
	];
	const arr_spanish = [
		"adaptable", "aventurero", "cariñoso", "asombroso", "artística",
		"hermosa", "sin límites", "valiente",
		"tranquila", "capaz", "atento", "inteligente", "cómodo", "compasiva", "seguro", "considerado", "valiente", "creativo",
		"decisivo", "determinado", "diligente", "dinámica",
		"entusiasta", "enérgico", "entretenido", "exuberante", "expresiva",
		"fabulosa", "fantástico", "valiente", "amigable", "divertido",
		"generoso", "gentil",
		"feliz", "trabajador", "servicial", "divertidísimo", "honesta",
		"imaginativo", "independiente", "intelectual", "inteligente", "intuitivo", "inventivo",
		"alegre",
		"amable", "bondadoso", "conocedor",
		"sano", "animado", "querido", "cariñosa", "leal",
		"modesto",
		"optimista", "extrovertido",
		"apasionado", "paciente", "persistente", "educado", "práctico", "bonito", "proactivo", "productivo",
		"ingenioso",
		"racional", "receptivo", "confiable", "ingenioso", "responsable",
		"sensato", "sensible", "hábil", "inteligente", "directo", "fuerte", "exitosa",
		"considerado", "digno de confianza",
		"comprensiva",
		"versátil", "vivaz",
		"cálido", "dispuesto", "sabio", "ingenioso", "maravillosa",
	];
	var lang_type = "english";
	class main_engine {
		constructor() {
			this.c = document.getElementById("main_canvas");
			this.ctx = this.c.getContext("2d");
			this.statements = [];
			this.state_arr = [];
			this.prepare_statements();
			this.google_font = new FontFace(
			  "Reenie Beanie", 
			  "url(https://fonts.gstatic.com/s/reeniebeanie/v22/z7NSdR76eDkaJKZJFkkjuvWxXPq1qw.woff2)"
			);
			this.google_font.load().then((loaded_font) => {
				document.fonts.add(loaded_font);
				this.ctx.font = "48px 'Reenie Beanie'";
			}).catch((error) => {
				console.error("Font failed to load:", error);
			});
		}
		reset_all() {
			this.statements = [];
			this.state_arr = [];
			this.prepare_statements();
		}
		prepare_statements() {
			let use_arr = [];
			let prep_text = "";
			switch(lang_type) {
				case "english": use_arr = arr_english;	prep_text = "You are "; break;
				case "french": 	use_arr = arr_french;	prep_text = "Tu es "; 	break;
				case "spanish": use_arr = arr_spanish; 	prep_text = "Tú eres ";	break;
			}
			for(let z = 0; z < use_arr.length; z++) {
				this.statements.push(prep_text + use_arr[z]);
			}
			for(let z = 0; z < 15; z++) {
				let rand_index = this.get_rand(0, this.statements.length - 1);
				let rand_size = this.get_rand(0, 2);
				let rand_pos_x = this.get_rand(0, 10) * 0.1;
				let rand_pos_y = this.get_rand(0, 10) * 0.1;
				let rand_speed = this.get_rand(5, 20) * 0.01 * ((3 - rand_size) / 3);
				this.state_arr.push([this.statements[rand_index], [rand_pos_x, rand_pos_y], rand_size, rand_speed]);
			}
			return this;
		}
		get_rand(minimum, maximum) {
			let min = minimum;
			let max = maximum;
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}
		set_draw_data(t, s) {
			this.ctx.font = "bold " + font_sizes[s] + "px Reenie Beanie";
			this.ctx.lineWidth = 1;
			let t_metrics = this.ctx.measureText(t);
			let t_height = t_metrics.fontBoundingBoxAscent + t_metrics.fontBoundingBoxDescent;
			let t_width = t_metrics.width;
			return [t_height, t_width];
		}
		animate_statements() {
			this.ctx.clearRect(0, 0, this.c.width, this.c.height);
			for(let z = 0; z < this.state_arr.length; z++) {
				//change the draw settings and return the text dims
				let dims = this.set_draw_data(this.state_arr[z][0], this.state_arr[z][2]);
				this.ctx.fillText(this.state_arr[z][0], (0 + this.state_arr[z][1][0]) * ww, (0 + this.state_arr[z][1][1]) * wh);
				this.update_position(z, dims);
			}
		}
		update_position(index, dims) {
			//fix x overhang
			if((this.state_arr[index][1][0] * ww) + dims[1] >= ww) {
				this.state_arr[index][1][0] = (ww - dims[1]) / ww;
			}
			if(((this.state_arr[index][1][1] * wh) - dims[0]) >= wh) {
				this.state_arr[index][1][1] = 0;
			} else {
				this.state_arr[index][1][1] = this.state_arr[index][1][1] + ((this.state_arr[index][3] * dims[0]) / wh);
			}
		}
	}
	$("#language_change").change(function(){
		//reset variables
		lang_type = $(this).val();
		me.reset_all();
	});
	function motivation_animation() {
		me.animate_statements();
		setTimeout(motivation_animation, 120);
	}
	me = new main_engine();
	motivation_animation();
});