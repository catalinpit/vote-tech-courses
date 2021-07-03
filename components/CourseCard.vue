<template>
    <div class="max-w-4xl mx-auto px-8 sm:px-6 lg:px-8 flex flex-row justify-center">
        <div class="mt-8 bg-white overflow-hidden shadow sm:rounded-lg p-6">
            <h2 class="text-2xl leading-7 font-semibold">
                <NuxtLink :to='id' class="hover:underline">{{ name }}</NuxtLink>
            </h2>
            <p class="mt-1 font-extralight italic text-gray-600">by {{ authors.toString() }}</p>
            <p class="mt-3 text-gray-600 italic">
                {{ excerpt }} <br>
            </p>
            <div class="flex flex-col items-center border-t border-dashed mt-5">
                <p class="mt-4 pt-4 text-gray-800 font-bold text-xl tracking-wider">
                    The course has <code class="bg-gray-100 text-2xl p-1 rounded border">{{ newVote }}</code> votes.
                </p>
                <p>
                    <button class="bg-white hover:bg-gray-200 mt-5 mb-2 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" @click="fetchData">Vote +1</button>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        vote: {
            type: Number,
            required: true
        },
        authors: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            newVote: this.vote
        }
    },
    methods: {
        async fetchData() {
                const options = {
                method: "POST"
            };

            const upvoted = await fetch(`/upvote/${this.id}`, options).then(res => res.json());

            this.newVote = upvoted.votes;
        }
    },
    computed: {
        excerpt() {
            return this.description.substring(0, 150) + "...";
        }
  }
}
</script>