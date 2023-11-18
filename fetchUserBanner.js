class DiscordBannerFetcher {
    constructor() {
        this.token = '';
        this.userId = '';
    }

    setToken(token) {
        this.token = token;
    }

    setUser(userId) {
        this.userId = userId;
    }

    async fetchUserBanner() {
        if (!this.token || !this.userId) {
            throw new Error('Token or User ID not set');
        }

        try {
            const response = await fetch(`https://discord.com/api/v9/users/${this.userId}`, {
                headers: {
                    Authorization: `Bot ${this.token}` 
                }
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const userData = await response.json();
            const bannerHash = userData.banner;

            if (bannerHash) {
                const isAnimated = bannerHash.startsWith('a_');
                const bannerUrl = `https://cdn.discordapp.com/banners/${this.userId}/${bannerHash}.${isAnimated ? 'gif' : 'png'}`;
                return bannerUrl;
            } else {
                return 'No banner found for this user.';
            }
        } catch (error) {
            console.error('Failed to fetch user banner:', error);
            return 'An error occurred while fetching the banner.';
        }
    }
}

module.exports = DiscordBannerFetcher;
