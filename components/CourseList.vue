<template>
    <div>
        <ul>
            <li v-for="course in courses" :key="course.id">
                <CourseCard
                    :id="course.id"
                    :name="course.name"
                    :description="course.description"
                    :url="course.url"
                    :vote="course.vote"
                    :authors="course.authors.map(author => author.name)"
                />
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        courses: {
            type: Array,
            default: () => {
                return []
            },
            require: true
        }
    },
}
</script>