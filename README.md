<h1>Undertale CSS Collection</h1>

<p>This stylesheet, and its accompanying font files, will allow you to make your webpages look thematically related to Undertale, through the use of fonts and colour schemes. View the demo file in a browser for an example.</p>
<h2>Instructions for Use</h2>
<p>Somewhere in your HTML's &lt;head&gt; tag, include a reference to the stylesheet like to:<br />
	&lt;link rel="stylesheet" href="path/to/undertale.css" /&gt;<br />
	If you are not using HTML5, the additional attribute type="text/css" may be required.</p>
<p>If you want to use button sprites, presets, or get an animated "SAVE" button, do the following in addition to the above:</p>
<p>Somewhere in yout HTML's &lt;head&gt; element, add the following:<br />
	&lt;script src="path/to/undertale.js"&gt;&lt;/script&gt;<br />
	If you are not using HTML5, the additional attribute type="text/javascript" may be required.</p>
<h2>Javascript Documentation</h2>
<section>
	<h3>Global variable "Undertale"</h3>
	<ul>
		<li>
			<h3>Property "images"</h3>
			<p>The following properties correspond to image sources:</p>
			<ul>
				<li>fight</li>
				<li>act</li>
				<li>item</li>
				<li>mercy</li>
				<li>save</li>
			</ul>
			<p>The following property contains image sources corresponding to active buttons:</p>
			<ul>
				<li>
					<h4>Property "active"</h4>
					<ul>
						<li>fight</li>
						<li>act</li>
						<li>item</li>
						<li>mercy</li>
						<li>save</li>
						<li>saveEmpty (The save button without the heart)</li>
					</ul>
				</li>
			</ul>
		</li>
		<li>
			<h3>Property "presets"</h3>
			<ul>
				<li>
					<h4>Property "sprites"</h4>
					<p>The following methods take in a single element and create a button exactly emulating those seen in-game:</p>
					<ul>
						<li>fight(element)</li>
						<li>act(element)</li>
						<li>item(element)</li>
						<li>mercy(element)</li>
						<li>save(element)</li>
					</ul>
				</li>
				<li>
					<h4>Property "css"</h4>
					<p>The following methods approximate the appearance of the in-game buttons using CSS:</p>
					<ul>
						<li>fight(element)</li>
						<li>act(element)</li>
						<li>item(element)</li>
						<li>mercy(element)</li>
					</ul>
				</li>
			</ul>
		</li>
	</ul>
</section>
