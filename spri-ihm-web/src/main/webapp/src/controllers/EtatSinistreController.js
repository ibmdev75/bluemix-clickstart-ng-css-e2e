etatSinistreApp.controller('EtatSinistreController', function($scope,$q,ServiceEtatSinistre) {

//Watchs

$scope.$watch('societe.selected', function(obj) {
	if(_.isObject(obj) && obj.code!="")	{
		
		$scope.societe.selected = obj;
	}
	else {
		$scope.societe.selected = undefined;
	}
});

//Listeners

$scope.$on('fam', function(event,data) {
	$scope.fam = data;
});
$scope.$on('codeproduit', function(event,data) {
	$scope.codeproduit = data;
});
$scope.$on('numerocontrat', function(event,data) {
	$scope.numerocontrat = data;
});
$scope.$on('groupecontrat', function(event,data) {
	$scope.groupecontrat = data;
});
$scope.$on('etatgarantie', function(event,data) {
	$scope.etatgarantie = data;
});

$scope.$on('exercice', function(event,data) {
	$scope.exercice = data;
});

// Méthode de réinitialisation du formulaire 

$scope.reset = function() {
	
	$scope.init=false;	
	$scope.onError=false;
	
	$scope.title="LISTE DES SINISTRES";


	// Gestion du paramètre Exercice
	$scope.exercice="5";
	$scope.lstExercices=[{id:"0", code: "exercice", libelle: "Année en cours"},
	                     {id:"5", code: "exercice", libelle: "Année en cours + 5 ans"},
	                     {id:"10", code: "exercice", libelle: "Année en cours + 10 ans"}
	                     ];

	//Gestion des états garanties

	$scope.etatgarantie='';
	$scope.lstEtatsGarantie=[{id:"0", code: "EC", libelle: "En cours"},
	                          {id:"1", code: "TR", libelle: "Terminé avec règlement"},
	                          {id:"2", code: "SS", libelle: "Terminé sans règlement"}
	                          ];

	
	$scope.isAllFamille=false;
	$scope.lstAllFamille=[{id:"IJ", code: "uniqueFamille", libelle: "Arrêt de travail"},
	                      {id:"LC", code: "uniqueFamille", libelle: "Licenciement Retraite"},
	                      {id:"BDM", code: "uniqueFamille", libelle: "Bris de machine"},
	                      {id:"DEC", code: "uniqueFamille", libelle: "Décennale"},
	                      {id:"DO", code: "uniqueFamille", libelle: "Dommage ouvrage"},
	                      {id:"INC", code: "uniqueFamille", libelle: "Incendie"},
	                      {id:"TRA", code: "uniqueFamille", libelle: "Travaux"},
	                      {id:"AUT", code: "uniqueFamille", libelle: "Auto"},
	                      {id:"IAP", code: "uniqueFamille", libelle: "Individuelle Accident / Prévoyance"}
	                     
	                     ];


	// Montant Limite
	$scope.montantLimite="";

	$scope.lstSocietes=[];
	$scope.societe={};
	$scope.societe.selected = undefined;

	$scope.fam='';
	$scope.lstFamilles=[];


	$scope.codeproduit='';
	$scope.lstCodeProduits=[];



	$scope.numerocontrat='';
	$scope.lstNumeroContrats=[];


	$scope.groupecontrat ='';
	$scope.lstGroupeContrats=[];
	
};

// Méthodes

$scope.capitalize =function() {
	$scope.noSouscripteur = $scope.noSouscripteur.toUpperCase();
};


$scope.validerEtatSinistre = function() {
		
		$scope.onError = false;

		ServiceEtatSinistre.initTransationSinistre().get(
		{
			"noSouscripteur":$scope.noSouscripteur,
			"exercice":$scope.exercice,
			"etatGaranties":$scope.etatgarantie,
			"montantLimite":$scope.montantLimite,
			"familles":$scope.fam,
			"codeproduit":$scope.codeproduit,
			"numerocontrat":$scope.numerocontrat,
			"groupecontrat":$scope.groupecontrat
			
		},
		// Traitement du flux de réponse
		function(data) {
			
			$scope.init=true;
			$scope.message=data.message;
			$scope.onError=$scope.message!="";
			
			if(data.codeErreur=='ZSNTQ0011') {
				$scope.isAllFamille =true;
				$scope.nomRaisonSociale = data.nomRaisonSociale;
				$scope.lstFamilles = $scope.lstAllFamille;
			}
			
			else if(data.message =="") {
			
				$scope.nomRaisonSociale = data.nomRaisonSociale;
				$scope.lstSocietes = data.lstSocietes;
				$scope.lstFamilles = data.lstFamilles;
				$scope.lstCodeProduits = data.lstCodeProduits;
				$scope.lstNumeroContrats = data.lstNumeroContrats;
				$scope.lstGroupeContrats = data.lstGroupeContrats;
			}
	});

};

// Traitement de réinitialisation de l'application

$scope.reinitialiserEtatSinistre = function() {
	
	$scope.reset();
	//ServiceEtatSinistre.reinitialiserEtatSinistre().get({},function(reponse) {
		//$scope.validerEtatSinistre();
	//});
};

});
