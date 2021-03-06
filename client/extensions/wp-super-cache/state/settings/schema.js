export const itemsSchema = {
	type: 'object',
	additionalProperties: false,
	patternProperties: {
		// Site Id
		'^\\d+$': {
			type: 'object',
			items: {
				cache_acceptable_files: { type: 'string' },
				cache_compression: { type: 'boolean' },
				cache_direct_pages: {
					type: 'array',
					items: { type: 'string' }
				},
				cache_disable_locking: { type: 'boolean' },
				cache_gc_email_me: { type: 'boolean' },
				cache_hello_world: { type: 'boolean' },
				cache_late_init: { type: 'boolean' },
				cache_list: { type: 'boolean' },
				cache_lock_down: { type: 'boolean' },
				cache_max_time: { type: 'integer' },
				cache_mobile_browsers: { type: 'string' },
				cache_mobile_prefixes: { type: 'string' },
				cache_mod_rewrite: { type: 'boolean' },
				cache_next_gc: { type: 'integer' },
				cache_path: { type: 'string' },
				cache_rebuild: { type: 'boolean' },
				cache_rejected_uri: { type: 'string' },
				cache_rejected_user_agent: { type: 'string' },
				cache_schedule_interval: { type: 'string' },
				cache_schedule_type: { type: 'string' },
				cache_scheduled_time: { type: 'string' },
				cache_time_interval: { type: 'integer' },
				cache_type: { type: 'string' },
				clear_cache_on_post_edit: { type: 'boolean' },
				disable_utf8: { type: 'boolean' },
				dont_cache_logged_in: { type: 'boolean' },
				front_page_checks: { type: 'boolean' },
				is_cache_enabled: { type: 'boolean' },
				is_mfunc_enabled: { type: 'boolean' },
				is_mobile_enabled: { type: 'boolean' },
				is_preload_enabled: { type: 'boolean' },
				is_preloading: { type: 'boolean' },
				is_super_cache_enabled: { type: 'boolean' },
				make_known_anon: { type: 'boolean' },
				minimum_preload_interval: { type: 'integer' },
				no_cache_for_get: { type: 'boolean' },
				ossdl_cname: { type: 'string' },
				ossdl_https: { type: 'boolean' },
				ossdl_off_cdn_url: { type: 'string' },
				ossdl_off_exclude: { type: 'string' },
				ossdl_off_include_dirs: { type: 'string' },
				ossdlcdn: { type: 'boolean' },
				pages: {
					type: 'object',
					items: {
						archives: { type: 'boolean' },
						author: { type: 'boolean' },
						category: { type: 'boolean' },
						feed: { type: 'boolean' },
						frontpage: { type: 'boolean' },
						home: { type: 'boolean' },
						pages: { type: 'boolean' },
						search: { type: 'boolean' },
						single: { type: 'boolean' },
						tag: { type: 'boolean' }
					}
				},
				post_count: { type: 'string' },
				preload_email_volume: { type: 'string' },
				preload_interval: { type: 'integer' },
				preload_on: { type: 'boolean' },
				preload_posts: { type: 'integer' },
				preload_taxonomies: { type: 'boolean' },
				refresh_current_only_on_comments: { type: 'boolean' },
				use_304_headers: { type: 'boolean' }
			}
		}
	}
};
