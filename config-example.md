# config example for Traefik/caddy

```text
traefik.enable=true

# Middleware for redirecting to titaanproducties.nl
traefik.http.middlewares.redirect-to-titaan.redirectscheme.scheme=https
traefik.http.middlewares.redirect-to-titaan.redirectscheme.permanent=true

# Middleware for redirecting www to non-www
traefik.http.middlewares.1-my-project-name-to-non-www.redirectregex.permanent=false
traefik.http.middlewares.1-my-project-name-to-non-www.redirectregex.regex=^(http|https)://www\.(.+)
traefik.http.middlewares.1-my-project-name-to-non-www.redirectregex.replacement=${1}://${2}

# Middleware for gzip compression
traefik.http.middlewares.gzip.compress=true

# Redirect to HTTPS middleware
traefik.http.middlewares.redirect-to-https.redirectscheme.scheme=https

# HTTP routers for titaanproducties.nl
traefik.http.routers.http-0-my-project-name.entryPoints=http
traefik.http.routers.http-0-my-project-name.middlewares=redirect-to-https
traefik.http.routers.http-0-my-project-name.rule=Host(`titaanproducties.nl`) && PathPrefix(`/`)
traefik.http.routers.http-0-my-project-name.service=http-0-my-project-name

# HTTP routers for www.titaanproducties.nl
traefik.http.routers.http-1-my-project-name.entryPoints=http
traefik.http.routers.http-1-my-project-name.middlewares=redirect-to-https
traefik.http.routers.http-1-my-project-name.rule=Host(`www.titaanproducties.nl`) && PathPrefix(`/`)
traefik.http.routers.http-1-my-project-name.service=http-1-my-project-name

# HTTPS routers for titaanproducties.nl
traefik.http.routers.https-0-my-project-name.entryPoints=https
traefik.http.routers.https-0-my-project-name.middlewares=gzip
traefik.http.routers.https-0-my-project-name.rule=Host(`titaanproducties.nl`) && PathPrefix(`/`)
traefik.http.routers.https-0-my-project-name.service=https-0-my-project-name
traefik.http.routers.https-0-my-project-name.tls.certresolver=letsencrypt
traefik.http.routers.https-0-my-project-name.tls=true

# HTTPS routers for www.titaanproducties.nl
traefik.http.routers.https-1-my-project-name.entryPoints=https
traefik.http.routers.https-1-my-project-name.middlewares=gzip,1-my-project-name-to-non-www
traefik.http.routers.https-1-my-project-name.rule=Host(`www.titaanproducties.nl`) && PathPrefix(`/`)
traefik.http.routers.https-1-my-project-name.service=https-1-my-project-name
traefik.http.routers.https-1-my-project-name.tls.certresolver=letsencrypt
traefik.http.routers.https-1-my-project-name.tls=true

# HTTP routers for suzannekortbeek.nl
traefik.http.routers.http-2-my-project-name.entryPoints=http
traefik.http.routers.http-2-my-project-name.middlewares=redirect-to-titaan
traefik.http.routers.http-2-my-project-name.rule=Host(`suzannekortbeek.nl`) && PathPrefix(`/`)
traefik.http.routers.http-2-my-project-name.service=http-2-my-project-name

# HTTP routers for www.suzannekortbeek.nl
traefik.http.routers.http-3-my-project-name.entryPoints=http
traefik.http.routers.http-3-my-project-name.middlewares=redirect-to-https
traefik.http.routers.http-3-my-project-name.rule=Host(`www.suzannekortbeek.nl`) && PathPrefix(`/`)
traefik.http.routers.http-3-my-project-name.service=http-3-my-project-name

# Load balancer settings for services
traefik.http.services.http-0-my-project-name.loadbalancer.server.port=3000
traefik.http.services.http-1-my-project-name.loadbalancer.server.port=3000
traefik.http.services.http-2-my-project-name.loadbalancer.server.port=3000
traefik.http.services.http-3-my-project-name.loadbalancer.server.port=3000
traefik.http.services.https-0-my-project-name.loadbalancer.server.port=3000
traefik.http.services.https-1-my-project-name.loadbalancer.server.port=3000
traefik.http.services.https-2-my-project-name.loadbalancer.server.port=3000
traefik.http.services.https-3-my-project-name.loadbalancer.server.port=3000

# Caddy configuration (ensure this is correct)
caddy_0.encode=zstd gzip
caddy_0.handle_path.0_reverse_proxy={{upstreams 3000}}
caddy_0.handle_path=/*
caddy_0.header=-Server
caddy_0.try_files={path} /index.html /index.php
caddy_0=https://titaanproducties.nl

caddy_1.encode=zstd gzip
caddy_1.handle_path.1_reverse_proxy={{upstreams 3000}}
caddy_1.handle_path=/*
caddy_1.header=-Server
caddy_1.redir=https://titaanproducties.nl{uri}
caddy_1.try_files={path} /index.html /index.php
caddy_1=https://www.titaanproducties.nl

caddy_2.encode=zstd gzip
caddy_2.handle_path.2_reverse_proxy={{upstreams 3000}}
caddy_2.handle_path=/*
caddy_2.header=-Server
caddy_2.try_files={path} /index.html /index.php
caddy_2=https://suzannekortbeek.nl

caddy_3.encode=zstd gzip
caddy_3.handle_path.3_reverse_proxy={{upstreams 3000}}
caddy_3.handle_path=/*
caddy_3.header=-Server
caddy_3.redir=https://titaanproducties.nl{uri}
caddy_3.try_files={path} /index.html /index.php
caddy_3=https://www.suzannekortbeek.nl

caddy_ingress_network=coolify
```
