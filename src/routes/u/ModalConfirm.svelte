<script lang="ts">
    export let modal_id: string;
    export let title: string;
	export let content: string;
	export let action: string;
	export let label_positive: string;
</script>


<input type="checkbox" id="{modal_id}" class="modal-toggle" />
<div class="modal">
	<div class="modal-box relative var(--color-bg-1)">
		<label for="{modal_id}" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
		<h3 class="text-lg font-bold mb-4">{title}</h3>
		<div class="flex flex-col">
			<p>{content}</p>
			<div class="flex flex-row justify-end mt-4">
				<label for="{modal_id}" class="btn btn-ghost">Cancel</label>

				<form method="POST" action="{action}">
					<slot />
					<button type="submit" class="btn btn-ghost">{label_positive}</button>
				</form>
			</div>
		</div>
	</div>
</div>