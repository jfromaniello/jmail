####SETUP
if(!(Get-Module -List PsGet)) {
    Write-Host "Uh-Oh you don't have the PsGet installed. Let me handle that for you."
    (new-object Net.WebClient).DownloadString("http://psget.net/GetPsGet.ps1") | iex
}
Import-Module PsGet

if(!(Get-Module -List pswatch)) {
    Write-Host "Uh-Oh you don't have the pswatch cmdlet installed. Let me handle that for you."
    Install-Module PsWatch
} 
Import-Module pswatch

if(!(Get-Module -List Send-Growl)) {
    Write-Host "Uh-Oh you don't have the Send-Growl cmdlet installed. Let me handle that for you."
    Install-Module Send-Growl
}

Import-Module Send-Growl

$IsGrowlInstalled = !(!(Get-GrowlPath))
if(!$IsGrowlInstalled ) {
    Write-Host "You don't have Growl installed... changing to Sad-Mode" -fore Red
    Write-Host "If you wanna be cool install Growl For Windows from here http://www.growlforwindows.com" -fore Red
}else{
    Register-GrowlType jMail UnitTests
    Send-Growl jMail UnitTests "Initialized" "Initialized with Happy-Mode=True" "http://be-happy.com"
}
##########

$currentLocation = Get-Location

watch "$currentLocation\..\..\" | %{
	
    #Generate index.cshtml
    $razorIndexTemplate = resolve-path .\..\..\index.cshtml
	..\razorcandle\razorcandle.exe "$razorIndexTemplate"

    #Generate all.tests.cshtml
	$razorTemplate = resolve-path .\..\..\scripts\Tests\All.Tests.cshtml
	..\razorcandle\razorcandle.exe "$razorTemplate" /M="{CI: false}"

    $allTestsRelativePath = ".\..\..\scripts\Tests\All.Tests.html" 
	
    .\phantomjs.exe run-qunit.js $allTestsRelativePath  |    
            %{ 
                if($IsGrowlInstalled  -and $_.Contains("passed,") -and $_.Contains("failed.")){
                    $allTestsUrl = Resolve-Path $allTestsRelativePath
                    Send-Growl jMail UnitTests "Tests Run" "$_" "file:///$allTestsUrl"
                }
                Write-Host $_
            }
}