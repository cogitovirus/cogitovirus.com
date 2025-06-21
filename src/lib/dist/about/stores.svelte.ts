function currDocSlugState() {
  let slug: string | null = $state(null);

  return {
    get slug(): string | null {
      return slug;
    },
    set slug(v: string) {
      slug = v;
    },
  };
}

export const currDocSlug = currDocSlugState();
