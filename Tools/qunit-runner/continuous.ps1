$m = Get-Module -List pswatch 
if(!$m) {
	Write-Host "Uh-Oh you don't have the pswatch cmdlet installed. Let me handle that for you."
	iex ((new-object net.webclient).DownloadString("http://bit.ly/Install-PsWatch"))
} 

Import-Module pswatch

$currentLocation = Get-Location

watch "$currentLocation\..\..\" | %{
	#Ignore $_
	
	$razorIndexTemplate = resolve-path .\..\..\index.cshtml
	..\razorcandle\razorcandle.exe "$razorIndexTemplate"

	$razorTemplate = resolve-path .\..\..\scripts\Tests\All.Tests.cshtml
	..\razorcandle\razorcandle.exe "$razorTemplate" /M="{CI: false}"
	.\phantomjs.exe run-qunit.js .\..\..\scripts\Tests\All.Tests.html
}