	
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>
	<script>window.jQuery || document.write('<script src="assets/js/components/jquery/jquery.min.js"><\/script>')</script>

	<?php // Check if we're on a dev or production server - just set this manually to test either way.
	
	$server_type = getenv('SERVER_TYPE'); ?>

	<?php if ($server_type === 'production'): ?>

		<!-- Vendors -->
		<script type="text/javascript" src="/assets/js/release/vendor.min.js"></script>

		<!-- App -->
		<script type="text/javascript" src="/assets/js/release/app.min.js"></script>

	<?php else: ?>

		<!-- Vendors -->
		<script type="text/javascript" src="/assets/js/build/vendor.js"></script>

		<!-- App -->
		<script type="text/javascript" src="/assets/js/build/app.js"></script>

	<?php endif; ?>


</body>
</html>