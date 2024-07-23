<script>
	import '../app.css';
	import { Toaster } from 'svelte-sonner';
</script>

<Toaster position="top-center" richColors />
<main class="max-h-full w-full">
	<div class="container mx-auto h-full w-3/4">
		<slot></slot>
	</div>
</main>
