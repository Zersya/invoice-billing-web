// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	interface Error {
        message: {'debug':string, 'value':string}
        status: string
    }

	interface Locals {
		merchant: import('$lib/types/merchant').Merchant
	}
	// interface PageData {}
	// interface Platform {}
}
